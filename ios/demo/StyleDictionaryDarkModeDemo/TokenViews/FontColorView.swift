//
//  FontColorView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 4/8/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI
import StyleDictionaryDarkMode

struct FontColorRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        HStack {
            Text("Aa")
                .font(.title)
                .foregroundColor(color)
                .padding(Size.paddingMedium)
            VStack(alignment: .leading) {
                Text(label)
                    .foregroundColor(color)
            }
            .padding(.leading, Size.paddingMedium)
            Spacer()
        }
        .padding(Size.paddingMedium)
    }
}

struct FontColorView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    Group {
                        FontColorRow(label:"Primary", color:Color.fontPrimary)
                        FontColorRow(label:"Secondary", color:Color.fontSecondary)
                        FontColorRow(label:"Tertiary", color:Color.fontTertiary)
                    }
                    Group {
                        FontColorRow(label:"Interactive", color:Color.fontInteractive)
                        FontColorRow(label:"Hover", color:Color.fontHover)
                        FontColorRow(label:"Active", color:Color.fontActive)
                        FontColorRow(label:"Disabled", color:Color.fontDisabled)
                    }
                    Group {
                        FontColorRow(label:"Danger", color:Color.fontDanger)
                        FontColorRow(label:"Warning", color:Color.fontWarning)
                        FontColorRow(label:"Success", color:Color.fontSuccess)
                        FontColorRow(label:"Info", color:Color.fontInfo)
                    }
                }
            }
        }
        .navigationBarTitle("Font Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
    }
}

struct FontColorView_Previews: PreviewProvider {
    static var previews: some View {
        FontColorView()
    }
}
